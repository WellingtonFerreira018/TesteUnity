import * as React from 'react';
import { StyledCardHistory } from './styled';
import { Matematica } from '../../assets';
import { history } from '../../assets/data/history';
import { Accordion, Alert, Card, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { format } from 'date-fns';

export default function CardHistory() {

  const historico = history;

  console.log(historico)

  let i = 0;

  return (
    <StyledCardHistory>
      <Container fluid>
        <Row>
          {
            historico.map(historico => {
              const data = historico.createdAt.slice(0, 10);
              const dataFormatada = format(new Date(data), 'dd/MM/yyyy')
              return (
                <Col lg="3">
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={Matematica} />
                    <Card.Body>
                      <Card.Title>{historico.game}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Jogado em {dataFormatada}</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">Duração: {historico.timeDuration}</Card.Subtitle>
                      <hr />
                      {
                        historico.groups.map(groups => {
                          return (
                            <Accordion>
                              <Accordion.Item eventKey={groups.name}>
                                <Accordion.Header>{groups.name}</Accordion.Header>
                                <Accordion.Body>
                                  - {groups.players[0]}
                                  <br />
                                  - {groups.players[1]}
                                  <br />
                                  - {groups.players[2]}
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>

                          )
                        })
                      }
                      <br />
                      <Card.Title>
                        Colocações:
                      </Card.Title>
                      {
                        historico.podium.map(podium => {
                          if(i===4){
                            i=0
                          }
                          i++
                          return (
                            <Alert key="warning" variant="warning">
                              <b>{i}º Grupo {podium.group}</b>
                              <ProgressBar variant='warning' animated now={podium.position} />
                            </Alert>
                          )
                        })
                      }
                    </Card.Body>
                  </Card>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </StyledCardHistory>
  )
};