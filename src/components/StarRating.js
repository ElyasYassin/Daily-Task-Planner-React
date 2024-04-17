import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { Image } from 'react-bootstrap';
import StarRating from './StarRating'; 
import ReviewSection from './ReviewSection';

class MovieDetail extends Component {
    render() {
        const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>;
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.actors.map((actor, i) => (
                                <p key={i}>
                                    <b>{actor.actorName}</b> {actor.characterName}
                                </p>
                            ))}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h4><BsStarFill /> {this.props.selectedMovie.avgRating}</h4>
                            {/* Render the StarRating component */}
                            <StarRating />
                        </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.movieReviews.map((review, i) => (
                            <p key={i}>
                                <b>{review.username}</b>&nbsp; {review.review}
                                &nbsp; <BsStarFill /> {review.rating}
                            </p>
                        ))}
                    </Card.Body>
                </Card>
            );
        };

        return (
            <>
                <DetailInfo />
                {/* Render the ReviewSection component */}
                <ReviewSection />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    };
};

export default connect(mapStateToProps)(MovieDetail);
