import React, { FormEvent } from 'react';
import { EventManager } from '../util/eventManager';

interface Props {
  //
}

interface State {
  value: string;
}

function apiCall(input: string) {
  console.log(`apiCall:: input: ${input}`);
}

export default class InputForm extends React.Component<Props, State> {
  eventManagerFirst = new EventManager();
  eventManagerSecond = new EventManager();

  constructor(props: Props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log('inputmanager constructed');
    this.eventManagerSecond.add('this_get_sadded_twice', this.test);
  }

  test = (t: any) => {
    console.log('test : ' + t);
  };

  componentDidMount() {
    this.eventManagerFirst.add('hello', this.test);
    this.eventManagerFirst.printEvents('first');
    this.eventManagerSecond.printEvents('second');

    const t: any = this.eventManagerFirst.getEventMap();

    // t['hello']?.[0]?.('1');
    // t['hello']?.[1]?.('2');
    console.log(t);
    if (t.hello) {
      t.hello[0]?.callback('1');
      t.hello[1]?.callback('2');
    }
  }

  componentWillUnmount() {
    this.eventManagerFirst.dispose();
    this.eventManagerSecond.dispose();
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
    apiCall(event.target.value);
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
