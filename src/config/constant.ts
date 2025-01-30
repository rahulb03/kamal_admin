export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';


// const token = localStorage.getItem("token");
const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}


export const API_ENDPOINTS = { 
    AUTH : {
        LOGIN : `auth/local`,
        REGISTER : `auth/local/register`

    } ,

    PRODUCT: {
        FETCH_PRODUCTS : `api/products`,
        FETCH_PRODUCT_BY_ID : `api/products/`,
        CREATE_PRODUCT : `api/products`,
        UPDATE_PRODUCT : `api/products/`,
        DELETE_PRODUCT : `api/products/`
    },

    CATEGORY:{
        FETCH_CATEGORIES : `api/categories`,
        FETCH_CATEGORY_BY_ID : `api/categories/`,
        CREATE_CATEGORY : `api/categories`,
        UPDATE_CATEGORY : `api/categories/`,
        DELETE_CATEGORY : `api/categories/`
    }


}