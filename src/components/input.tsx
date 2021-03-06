import React, { FormEvent } from 'react';

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
  constructor(props: Props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
