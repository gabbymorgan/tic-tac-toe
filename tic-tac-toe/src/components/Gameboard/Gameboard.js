import React, { Component } from 'react';
import {
    Row,
    Col,
    Container,
} from 'reactstrap';

import './Gameboard.css';

class GameBoard extends Component {
    state = {
        sections: {
            '0': [],
            '1': [],
            '2': [],
        },
        turn: 'X',
        winner: null,
        history: []
    }

    render() {
        return (
            <Container className='Container'>
                <Row>
                   <h1>Time to Play the Game</h1>
                </Row>
                <Row className='Gameboard'>
                    <Col xs='6'>
                        <Row>
                            {this.state.sections[0].map(section => {
                                return (
                                <Col key={section.id} xs='4' className='Section'
                                section={section}
                                onClick={() => this.handleClick('0', section)}>
                                    <h1>{section.value}</h1>
                                </Col>
                                )
                            })}
                            {this.state.sections[1].map(section => {
                                return (
                                <Col key={section.id} xs='4' className='Section'
                                section={section}
                                onClick={() => this.handleClick('1', section)}>
                                    <h1>{section.value}</h1>
                                </Col>
                                )
                            })}
                            {this.state.sections[2].map(section => {
                                return (
                                <Col key={section.id} xs='4' className='Section'
                                section={section}
                                onClick={() => this.handleClick('2', section)}>
                                    <h1>{section.value}</h1>
                                </Col>
                                )
                            })}
                        </Row>
                        <Row>
                            <Col>
                                <h4>Turn: {this.state.turn}</h4>
                            </Col>
                            <Col>
                                <h4>Winner: {this.state.winner}</h4>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }

    componentDidMount() {
        this.setState({
            sections: {
                '0': Array.apply(null, {length: 3}).map((section, index) => {
                    return {
                        id: index,
                        value: null,
                        clicked: false,
                    }
                }),

                '1': Array.apply(null, {length: 3}).map((section, index) => {
                    return {
                        id: index,
                        value: null,
                        clicked: false,
                    }
                }),

                '2': Array.apply(null, {length: 3}).map((section, index) => {
                    return {
                        id: index,
                        value: null,
                        clicked: false,
                    }
                }),
            }
        });
    }

    handleClick(rowNum, section) {
        this.changeSection(rowNum, section);
        this.checkWin();
    }

    changeSection(rowNum, section) {
        const sections = this.state.sections;
        const row = this.state.sections[rowNum];

        if (section.clicked === false && this.state.winner === null) {
            const turns = ['X', 'O']
            row[section.id] = {
                id: section.id,
                value: this.state.turn,
                clicked: true,
            }

            const turn = turns.find(turn => turn !== this.state.turn);

            this.setState({

                sections: Object.assign({}, this.state.sections, {
                    [rowNum]: row,
                }),
                turn,

            });
        }
    }

    checkWin() {
        
        const sections = this.state.sections;
        const wins = [
            [sections[0][0], sections[1][0], sections[2][0]],
            [sections[0][1], sections[1][1], sections[2][1]],
            [sections[0][2], sections[1][2], sections[2][2]],
            [sections[0][0], sections[1][1], sections[2][2]],
            [sections[2][0], sections[1][1], sections[0][2]],
            sections[0],
            sections[1],
            sections[2],
        ]

        wins.forEach(win => {
            if (win.filter(section => section.value === 'X').length === 3 && win[0].id !== null) {
                console.log(win);
                this.setState({
                    winner: win[0].value,
                })
            }
        })
    }
}


export default GameBoard;