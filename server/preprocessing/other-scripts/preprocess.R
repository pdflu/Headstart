vplog <- getLogger('vis.preprocess')


sanitize <- function(metadata) {
  metadata$paper_abstract <- unlist(lapply(metadata$paper_abstract,
                              function(x) {
                                if (nchar(x) > 17000) {
                                  x <- substr(x, 0, 17000)
                                  x <- paste(x, "[...]")
                                } else {
                                  x
                                }
                              }))
  return(metadata)
}


detect_language <- function(text) {
  lang_detected <- lapply(text, textcat)
  # from russian-iso8859_5 only take russian
  lang_detected <- unlist(lapply(lang_detected,
                    function(x) {vapply(strsplit(x,"-"), `[`, 1, FUN.VALUE=character(1))}
                  ))
  lang_detected <-
  return(lang_detected)
}


filter_duplicates <- function(metadata, text, list_size) {
  #If list_size is greater than -1 and smaller than the actual list size, deduplicate titles
  if(list_size > -1) {
    output = deduplicate_titles(metadata, list_size)
    text = subset(text, !(id %in% output))
    metadata = subset(metadata, !(id %in% output))

    text = head(text, list_size)
    metadata = head(metadata, list_size)
  }
  return(list(metadata=metadata, text=text))
}


deduplicate_titles <- function(metadata, list_size) {
  output <- c()

  metadata$oa_state[metadata$oa_state == "2"] <- 0
  metadata = metadata[order(-as.numeric(metadata$oa_state),-stri_length(metadata$subject),
                      -stri_length(metadata$paper_abstract),-stri_length(metadata$authors),
                      -stri_length(metadata$published_in)),]

  index = (grepl(" ", metadata$title) == FALSE | stri_length(metadata$title) < 15)
  metadata$title[index] <- paste(metadata$title[index], metadata$authors[index], sep=" ")

  num_items = length(metadata$id)
  max_replacements = ifelse(num_items > list_size, num_items - list_size, -1)

  ids = metadata$id
  titles = metadata$title
  titles = unlist(lapply(titles, tolower))
  count = 1


  lv_matrix = stringdistmatrix(titles, method="lv")
  length_matrix <- stri_length(titles)
  n = length(length_matrix)
  str_matrix = matrix(length_matrix, n, n)
  str_matrix_t <- t(str_matrix)
  str_max_matrix = pmax(str_matrix, str_matrix_t)
  lv_ratio_matrix = as.matrix(lv_matrix)/str_max_matrix

  duplicates <- lv_ratio_matrix < 1/15.83
  duplicates[lower.tri(duplicates, diag=TRUE)] <- NA
  remove_ids <- which(apply(duplicates, 2, FUN=function(x){any(x)}))
  output = ids[remove_ids]

  vplog$info(paste("Number of max. duplicate entries:", length(output)))

  if(max_replacements > -1) {
    output = head(output, max_replacements)
  }

  vplog$info(paste("map_id:", .GlobalEnv$MAP_ID, "Number of duplicate entries:", length(output)))

  return(output)

}

replace_keywords_if_empty <- function(metadata, stops, service) {
  metadata$subject <- unlist(lapply(metadata$subject, function(x) {gsub(" +", " ", x)}))
  missing_subjects = which(lapply(metadata$subject, function(x) {nchar(x)}) <= 1)
  vplog$info(paste("map_id:", .GlobalEnv$MAP_ID, "Documents without subjects:", length(missing_subjects)))
  if (service == "linkedcat" || service == "linkedcat_authorview" || service == "linkedcat_browseview") {
    metadata$subject[missing_subjects] <- metadata$bkl_caption[missing_subjects]
    metadata$subject[is.na(metadata$subject)] <- ""
  } else {
    candidates = mapply(paste, metadata$title)
    candidates = lapply(candidates, function(x)paste(removeWords(x, stops), collapse=""))
    candidates = lapply(candidates, function(x) {gsub("[^[:alpha:]]", " ", x)})
    candidates = lapply(candidates, function(x) {gsub(" +", " ", x)})
    candidates_bigrams = lapply(lapply(candidates, function(x)unlist(lapply(ngrams(unlist(strsplit(x, split=" ")), 2), paste, collapse="_"))), paste, collapse=" ")
    #candidates_trigrams = lapply(lapply(candidates, function(x)unlist(lapply(ngrams(unlist(strsplit(x, split=" ")), 3), paste, collapse="_"))), paste, collapse=" ")
    candidates = mapply(paste, candidates, candidates_bigrams)
    #candidates = lapply(candidates, function(x) {gsub('\\b\\d+\\s','', x)})

    nn_corpus = Corpus(VectorSource(candidates))
    nn_tfidf = TermDocumentMatrix(nn_corpus, control = list(tokenize = SplitTokenizer, weighting = function(x) weightSMART(x, spec="ntn")))
    tfidf_top = apply(nn_tfidf, 2, function(x) {x2 <- sort(x, TRUE);x2[x2>=x2[3]]})
    tfidf_top_names = lapply(tfidf_top, names)
    replacement_keywords <- lapply(tfidf_top_names, function(x) filter_out_nested_ngrams(x, 3))
    replacement_keywords = lapply(replacement_keywords, FUN = function(x) {paste(unlist(x), collapse="; ")})
    replacement_keywords = gsub("_", " ", replacement_keywords)

    metadata$subject[missing_subjects] <- replacement_keywords[missing_subjects]
  }
  missing_subjects = which(lapply(metadata$subject, function(x) {nchar(x)}) <= 1)
  if (length(missing_subjects) > 0) {
    for (i in missing_subjects) {
      candidates = mapply(paste, metadata$title[i], metadata$paper_abstract[i])
      candidates = lapply(candidates, function(x)paste(removeWords(x, stops), collapse=""))
      candidates = lapply(candidates, function(x) {gsub("[^[:alpha:]]", " ", x)})
      candidates = lapply(candidates, function(x) {gsub(" +", " ", x)})
      candidates_bigrams = lapply(lapply(candidates, function(x)unlist(lapply(ngrams(unlist(strsplit(x, split=" ")), 2), paste, collapse="_"))), paste, collapse=" ")
      #candidates_trigrams = lapply(lapply(candidates, function(x)unlist(lapply(ngrams(unlist(strsplit(x, split=" ")), 3), paste, collapse="_"))), paste, collapse=" ")
      candidates = mapply(paste, candidates, candidates_bigrams)
      #candidates = lapply(candidates, function(x) {gsub('\\b\\d+\\s','', x)})
      nn_count = sort(table(strsplit(candidates, " ")), decreasing = T)
      replacement_keywords <- filter_out_nested_ngrams(names(nn_count), 3)
      replacement_keywords = lapply(replacement_keywords, FUN = function(x) {paste(unlist(x), collapse="; ")})
      replacement_keywords = gsub("_", " ", replacement_keywords)
      metadata$subject[i] <- paste(replacement_keywords, collapse="; ")
    }
  }
  return(metadata)
}

get_OHE_feature <-function(metadata, feature_name) {
  ohe_encoder <- onehot(metadata[feature_name], stringsAsFactors = TRUE, max_levels = 100)
  ohe_feat <- data.frame(predict(ohe_encoder, metadata[feature_name]))
  rownames(ohe_feat) <- metadata$id
  return(ohe_feat)
}
