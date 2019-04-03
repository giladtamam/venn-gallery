import axios from 'axios';

export const setSearchTerm = (searchTerm) => {
    return {
        type: 'SET_SEARCH_TERM',
        payload: { searchTerm }
    };
};

export const fetchImages = ({ searchTerm, loadMore } = {}) => {
    return (dispatch, getState) => {
        let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1';
        if (searchTerm) {
            url += `&tags=${searchTerm}`;
        }
 
        const { isLoading } = getState();
        let { page } = getState();
        if (!isLoading) {
            dispatch({ type: 'FETCH_IMAGES_START' });
            if (loadMore) {
                page++;
                url += `&page=${page}`;
            }
            axios.get(url)
                .then(({ data }) => {
                    const payload = {...data.photos, loadMore, searchTerm};
                    dispatch(setSearchTerm(searchTerm));
                    dispatch({ type: 'FETCH_IMAGES_SUCCESS', payload });
                });
        }
    };
  };