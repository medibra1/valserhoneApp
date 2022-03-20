export interface Slider {
    description1 : string,
    description2 : string,
    slider_image : string,
}

export interface Company {
    logo?: string,
    apropos?: string,
    tel?: string,
    email?: string,
    adresse1?: string, 
    adresse2?: string, 
    mapurl?: string,
    nomdomaine?: string, 
    horaire?: string
}

export interface Service {
    id: number
    service_nom: string,
    service_description: string,
    icon_name?: string
}

export interface Testimonial {
    nom ?: string,
    texte ?: string,
    photo ?: string,
    local ?: string
}

export interface Portofolio {
    id: number,
    service_nom: string,
    description2: string,
    description3: string,
    works: Work[]
}

export interface Work {
    travail_image: string
}

export interface Contact {
    nom : string,
    email : string,
    objet : string,
    message : string
}

export interface Devis {

    nom: string,
    adresse ?: string,
    email: string,
    telephone ?: string,

    dim_interieur ?: string,
    dim_exterieur ?: string, 
    dim_plafond ?: string,
    dim_sol_interieur ?: string,
    dim_sol_exterieur ?: string,
  
    service_interieur ?: string,
    service_exterieur ?: string,
    service_plafond ?: string,
    service_sol_interieur ?: string,
    service_sol_exterieur ?: string,

    divers_libelle ?: string,
    divers_dim ?: string,

    description ?: string,
    date ?: string,
    heure1 ?: string,
    heure2 ?: string,
}