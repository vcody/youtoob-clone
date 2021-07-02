import React from 'react';
import { SearchBar, VideoDetail, VideoList } from './components';
import { Grid } from '@material-ui/core';
import youtube from './api/youtube.js'

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount() {
       this.handleSubmit('ambiance jungle techno 5');
     }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video});
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', { params: {
            part: 'snippet',
            maxResults: 5,
            key: '',
            q: searchTerm,
        }
    });
        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
    }

    render() {
        const { selectedVideo, videos } = this.state;
        return (
            <Grid justify="center" container spacing={10}>
                <Grid item xs={12}></Grid>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        { /* SEARCH */ }
                        <SearchBar onFormSubmit={this.handleSubmit}/>
                    </Grid>
                    <Grid item xs={8}>
                        {/* video details */}
                        <VideoDetail video={selectedVideo} />
                    </Grid>
                    <Grid item xs={4}>
                        {/* video list */}
                        <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}


/*
const App = () => {
    return <h1>YouToob Clone App</h1>;
}
*/
export default App;