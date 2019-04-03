import {connect} from 'react-redux'
import App from '../components/App'
import { fetchImages } from '../actions'

const mapDispatchToProps = {
    fetchImages
};
  
const mapStateToProps = (state) => {
    return {
        photos: state.photos || [],
        searchTerm: state.searchTerm || ''
    }
};
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);