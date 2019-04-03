export const initialState = {
  photos: [],
  page: 1,
  pages: 0,
  perpage: 0,
  total: 0,
  isLoading: false,
  searchTerm: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {...state, searchTerm: action.payload.searchTerm}
    case 'FETCH_IMAGES_SUCCESS':
      const { page, pages, perpage, total, loadMore = false, searchTerm = '' } = action.payload
      
      let photos = action.payload.photo
      if (loadMore) {
        photos = [...state.photos, ...photos]
      }
      return { 
        photos, page, pages, perpage, total, isLoading: false, searchTerm
      }
    case 'FETCH_IMAGES_START':
      return {...state, isLoading: true}
    default:
      return state
  }
}
