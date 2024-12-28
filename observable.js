class Subject {
  state = {};
  observers = [];

  attach(observer) {
    const isExist = this.observers.includes(observer);

    if (isExist) {
      return console.log('Subject: Observer já vinculado.');
    }

    this.observers.push(observer);
  }

  detach(observer) {
    const observerIndex = this.observers.indexOf(observer);

    if (observerIndex === -1) {
      return console.log('Subject: Observer não existe.');
    }

    this.observers.splice(observerIndex, 1);
  }

  notify(key) {
    for (const observer of this.observers) {
      observer.update(this, key);
    }
  }

  updateState(payload) {
    this.state[payload.key] = payload.value;
    this.notify(payload.key);
  }
}

class Observer {
  constructor(elId) {
    this.elId = elId;
  }

  update(subject, key) {
    const elToUpdate = document.getElementById(this.elId);
    elToUpdate.value = subject.state[key];
  }
}

const pageState = new Subject();

const input1 = new Observer('input1');
const input2 = new Observer('input2');

pageState.attach(input1);
pageState.attach(input2);

function updateInputValue(el) {
  pageState.updateState({key: 'inputValue', value: el.value});
}