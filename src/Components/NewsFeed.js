import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'

const newsAPI = 'http://newsapi.org/v2/everything?domains=wsj.com&apiKey=1da55418ae8a440f83342fc7adc46d1c'

class NewsFeed extends React.Component{
    constructor(props){
        super();
        this.state = {
            articles:[],
        };
    }


    componentDidMount(){
        fetch(newsAPI)
            .then(response => response.json())
            .then(data => this.setState({articles: data.articles}));
    }

    render(){
        const {articles} = this.state;

        return(
            <div style={{
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <Navbar expand='x1' bg="dark" variant="dark">
                    <Navbar.Brand>Financial News Outlet</Navbar.Brand>
                </Navbar>

                {articles.map(article => 
                    <Card style={{
                        width:'90rem', 
                    }}>
                        <Card.Body>
                            <Card.Title>
                                <a href={article.url}>{article.title}</a>
                            </Card.Title>
                            <Card.Subtitle className="text-news">{article.source.name}</Card.Subtitle>
                            <Card.Text>{article.description}</Card.Text>
                        </Card.Body>
                    </Card>
                )}
            </div>
        )
    }

}

export default NewsFeed;