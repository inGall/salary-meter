import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

class Information extends React.Component {
  constructor() {
    super();
    this.state = {
      salary: '',
      cpf: '',
      start_work: '',
      end_work: '',
      start_break: '',
      end_break: '',
      currTime: new Date().toLocaleString(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleClick() {
    const sal = this.state.salary;
    const cpf = this.state.cpf;
    const sw = this.state.start_work;
    const ew = this.state.end_work;
    const sb = this.state.start_break;
    const eb = this.state.end_break;
    this.props.handleSubmit(sal, cpf, sw, ew, sb, eb);
  }

  render() {
    return (
      <div className="info-container">
        <Form>
          <Form.Group as={Row} className="info-group">
            <Form.Label column sm="4">
              Salary ($):
            </Form.Label>
            <Col sm="5">
              <Form.Control name="salary" type="text" onChange={this.handleChange}></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="info-group">
            <Form.Label column sm="4">
              CPF contributions (%):{' '}
            </Form.Label>
            <Col sm="5">
              <Form.Control
                name="cpf"
                type="text"
                placeholder=" Eg. 20"
                onChange={this.handleChange}
              ></Form.Control>{' '}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="info-group">
            <Form.Label column sm="4">
              Start Work time:{' '}
            </Form.Label>
            <Col sm="5">
              <Form.Control
                name="start_work"
                type="text"
                placeholder=" Eg. 0930"
                onChange={this.handleChange}
              ></Form.Control>{' '}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="info-group">
            <Form.Label column sm="4">
              End Work time:{' '}
            </Form.Label>
            <Col sm="5">
              <Form.Control
                name="end_work"
                type="text"
                placeholder=" Eg. 1900"
                onChange={this.handleChange}
              ></Form.Control>{' '}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="info-group">
            <Form.Label column sm="4">
              Start Break time:{' '}
            </Form.Label>
            <Col sm="5">
              <Form.Control
                name="start_break"
                type="text"
                placeholder=" Eg. 1230"
                onChange={this.handleChange}
              ></Form.Control>{' '}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="info-group">
            <Form.Label column sm="4">
              End break time:{' '}
            </Form.Label>
            <Col sm="5">
              <Form.Control
                name="end_break"
                type="text"
                placeholder=" Eg. 1400"
                onChange={this.handleChange}
              ></Form.Control>{' '}
            </Col>
          </Form.Group>
        </Form>
        <Button variant="success" type="button" onClick={this.handleClick} style={{ marginLeft: '85%' }}>
          Submit
        </Button>
      </div>
    );
  }
}

export default Information;
