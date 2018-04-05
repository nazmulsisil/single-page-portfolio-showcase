class Person {
  constructor(name) {
    this.name = name;
    this.selfDescription();
  }

  selfDescription() {
    return "i m " + this.name + " from a method of Person class of Person.js";
  }
}

export default Person;
