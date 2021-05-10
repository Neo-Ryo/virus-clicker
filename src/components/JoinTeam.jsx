import React from 'react';
import Zoom from 'react-reveal/Zoom';
import { Form } from 'semantic-ui-react';
import { Button, Row, Col } from 'reactstrap';
import CardsGroup from './CardsGroup';
import styles from './Register.module.css';

export default function JoinTeam({
  submitJoinTeam,
  pseudoUser,
  handleChange,
  errorPseudoJoin,
  teams,
  teamUuid,
  wantCreateATeam,
  isLoading,
}) {
  return (
    <>
      <Form size="large" onSubmit={submitJoinTeam}>
        <Row>
          <Col>
            <Form.Field style={{ margin: '10px 0px' }}>
              <Form.Input
                required
                placeholder="Pseudo"
                value={pseudoUser}
                name="pseudoUser"
                onChange={handleChange}
                error={
                  errorPseudoJoin && {
                    content: 'This pseudo is already taken',
                    pointing: 'below',
                  }
                }
              />
            </Form.Field>
          </Col>
        </Row>

        <Row style={{ justifyContent: 'center' }}>
          <Zoom>
            {teams
              .filter((team) => team.logo.includes('PokeAPI'))
              .map(({ uuid, logo, name, createdAt, users }) => {
                return (
                  <Col style={{ marginTop: '20px' }}>
                    <CardsGroup
                      key={uuid}
                      image={logo}
                      header={name}
                      date={createdAt}
                      usersNumber={users.length}
                      onClick={() => this.chooseTeam(uuid)}
                      teamUuid={teamUuid}
                      uuid={uuid}
                    />
                  </Col>
                );
              })}
          </Zoom>
        </Row>
        <Zoom left>
          <Row>
            <Col style={{ textAlign: 'center' }}>
              {!wantCreateATeam && (
                <Button
                  color="danger"
                  type="submit"
                  value=""
                  disabled={isLoading}
                  size="lg"
                  style={{ margin: '50px' }}
                  className={styles.buttons}
                >
                  {!isLoading ? 'Start' : 'Loading...'}
                </Button>
              )}
            </Col>
          </Row>
        </Zoom>
      </Form>
    </>
  );
}
