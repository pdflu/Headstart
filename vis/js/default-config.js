var config = {
    bubble_min_scale: 1,
    bubble_max_scale: 1,
    paper_min_scale: 1,
    paper_max_scale: 1,
    zoom_factor: 0.9,
    padding_articles: 0,
    circle_padding: 0,
    dynamic_sizing: false,

    // map
    min_height: 600,
    min_width: 600,
    max_height: 1000,
    timeline_size: 600,

    // map reference sizes
    reference_size: 650,
    max_diameter_size: 50,
    min_diameter_size: 30,
    max_area_size: 110,
    min_area_size: 50,

    // bubbles
    area_title_max_size: 50,

    // papers
    dogear_width: 0.1,
    dogear_height: 0.1,
    paper_width_factor: 1.2,
    paper_height_factor: 1.6,

    // list
    min_list_size: 400,
    max_list_size: 500,
    list_height: 51,
    list_height_correction: 29,

    // preview
    preview_image_width_list: 230,
    preview_image_height_list: 298,
    preview_page_height: 400,
    preview_top_height: 30,
    preview_image_width: 738,
    preview_image_height: 984,
    abstract_small: 250,
    abstract_large: null,

    // data specific settings
    subdiscipline_title: "",
    use_area_uri: false,
    url_prefix: null,
    url_prefix_datasets: null,
    input_format: "csv",
    base_unit: "readers",
    preview_type: "image",

    is_force_areas: false,
    area_force_alpha: 0.02,

    is_force_papers: true,
    papers_force_alpha: 0.1,
    
    dynamic_force_area: false,
    dynamic_force_papers: false,

    render_list: true,
    render_bubbles: true,

    // show
    show_timeline: true,
    show_dropdown: true,
    show_intro: false,
    show_infolink: true,
    show_titlerow: true,
    show_list: false,
    show_context: false,
    
    create_title_from_context: false,

    sort_options: ["readers", "title", "authors", "year"],
    filter_options: ["all", "open_access", "publication", "dataset"],
    sort_menu_dropdown: false,
    initial_sort: null,

    content_based: false,

    filter_menu_dropdown: false,
    
    scale_toolbar: false,

    // transition
    transition_duration: 750,
    zoomout_transition: 750,

    // misc
    debug: false,
    debounce: 50,
    service: "none",
    language: "eng",

    // behaviour settings (mostly legacy)
    is_evaluation: false,
    is_adaptive: false,
    conference_id: 0,
    user_id: 0,
    max_recommendations: 10,

    //intro
    intro: "intro_hs",
    
    use_hypothesis: false,
    
    service_names: {plos: "PLOS", base: "BASE", pubmed: "PubMed", doaj: "DOAJ", openaire: "OpenAIRE"},

    localization: {
        eng: {
            loading: "Loading...",
            search_placeholder: "Search within map...",
            show_list: "Show list",
            hide_list: "Hide list",
            intro_label: "",
            readers: "readers",
            year: "date",
            authors: "authors",
            title: "title",
            default_title: 'Overview of <span id="num_articles"></span> documents',
            overview_label: 'Overview of',
            articles_label: 'documents',
            most_recent_label: 'most recent',
            source_label: 'Source',
            documenttypes_label: 'Document types',
            area: "Area",
            keywords: "Keywords",
            no_title: "No title",
            default_area: "No area",
            default_author: "",
            default_id: "defaultid",
            default_hash: "hashHash",
            default_abstract: "No Abstract",
            default_published_in: "",
            default_readers: 0,
            default_url: "",
            default_x: 1.,
            default_y: 1.,
            default_year: "",
            sort_by_label: 'sort by:',
        },
        ger: {
            loading: "Wird geladen...",
            search_placeholder: "Suche in der Liste...",
            show_list: "Liste ausklappen",
            hide_list: "Liste einklappen",
            intro_label: "",
            readers: "Leser",
            year: "Jahr",
            authors: "Autor",
            title: "Titel",
            default_title: 'Überblick über <span id="num_articles"></span> Artikel',
            overview_label: 'Überblick über',
            most_recent_label: 'neueste',
            articles_label: 'Artikel',
            source_label: 'Quelle',
            documenttypes_label: 'Publikationsarten',
            area: "Bereich",
            keywords: "Keywords",
            no_title: "Kein Titel",
            default_area: "Kein Bereich",
            default_author: "",
            default_id: "defaultid",
            default_hash: "hashHash",
            default_abstract: "",
            default_published_in: "",
            default_readers: 0,
            default_url: "",
            default_x: 1.,
            default_y: 1.,
            default_year: ""
        },
        eng_plos: {
            loading: "Loading...",
            search_placeholder: "Search within map...",
            show_list: "Show list",
            hide_list: "Hide list",
            intro_label: "",
            readers: "views",
            year: "date",
            authors: "authors",
            title: "title",
            area: "Area",
            keywords: "Keywords",
            no_title: "No title",
            overview_label: 'Overview of',
            articles_label: 'documents',
            most_recent_label: 'most recent',
            source_label: 'Source',
            documenttypes_label: 'Article types',
            default_area: "No area",
            default_author: "",
            default_id: "defaultid",
            default_hash: "hashHash",
            default_abstract: "No Abstract",
            default_published_in: "",
            default_readers: 0,
            default_url: "",
            default_x: 1.,
            default_y: 1.,
            default_year: "",
            sort_by_label: 'sort by:',
        },
        eng_pubmed: {
            loading: "Loading...",
            search_placeholder: "Search within map...",
            show_list: "Show list",
            hide_list: "Hide list",
            intro_label: "",
            relevance: "relevance",
            readers: "citations",
            year: "year",
            authors: "authors",
            title: "title",
            area: "Area",
            keywords: "Keywords",
            no_title: "No title",
            overview_label: 'Overview of',
            articles_label: 'documents',
            most_recent_label: 'most recent',
            source_label: 'Source',
            documenttypes_label: 'Article types',
            default_area: "No area",
            default_author: "",
            default_id: "defaultid",
            default_hash: "hashHash",
            default_abstract: "No Abstract",
            default_published_in: "",
            default_readers: 0,
            default_url: "",
            default_x: 1.,
            default_y: 1.,
            default_year: "",
            sort_by_label: 'sort by:',
        },
        eng_openaire: {
            loading: "Loading...",
            search_placeholder: "Search within map...",
            show_list: "Show list",
            hide_list: "Hide list",
            intro_label: "more info",
            relevance: "relevance",
            readers: "readers",
            tweets: "tweets",
            year: "year",
            authors: "authors",
            citations: "citations",
            title: "title",
            area: "Area",
            keywords: "Keywords",
            no_title: "No title",
            overview_label: 'Overview of',
            articles_label: 'documents',
            most_recent_label: 'most recent',
            source_label: 'Source',
            documenttypes_label: 'Article types',
            default_area: "No area",
            default_author: "",
            default_id: "defaultid",
            default_hash: "hashHash",
            default_abstract: "No Abstract",
            default_published_in: "",
            default_readers: 0,
            default_url: "",
            default_x: 1.,
            default_y: 1.,
            default_year: "",
            dataset_count_label: "datasets",
            paper_count_label: "papers",
            viper_edit_title: "How to add project resources",
            viper_edit_desc_label: `<p>Are you missing relevant publications and datasets related to this project? \ 
            <p>No problem: simply link further resources on the OpenAIRE website. \ 
            The resources will then be be automatically added to the map. \ 
            <p>Use the button indicated in the exemplary screenshot to do so: `,
            viper_button_desc_label: `<p>By clicking on the button below, you are redirected to the\
                OpenAIRE page for`,
            viper_edit_button_text: 'continue to openaire',
            viper_embed_button_text: 'Copy',
            viper_embed_title: 'embed map',
            link: 'link',
            tweets_count_label: " tweets",
            readers_count_label: " readers (Mendeley)",
            citations_count_label: " citations (Crossref)",
            filter_by_label: 'show: ',
            all: "any",
            open_access: "Open Access",
            publication: "papers",
            dataset: "datasets",
            items: "items",
            sort_by_label: 'sort by:',
            scale_by_label: 'Scale map by:',
        }
    },

    scale_types: [],

    url_plos_pdf: "http://www.plosone.org/article/fetchObject.action?representation=PDF&uri=info:doi/",
    plos_journals_to_shortcodes: {
        "plos neglected tropical diseases": "plosntds",
        "plos one": "plosone",
        "plos biology": "plosbiology",
        "plos medicine": "plosmedicine",
        "plos computational Biology": "ploscompbiol",
        "plos genetics": "plosgenetics",
        "plos pathogens": "plospathogens",
        "plos clinical trials": "plosclinicaltrials"
    }
};

if (config.content_based) {
    config.sort_options = ["title", "area"];
}

export default config;
