const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, office, role) {
    super(name, id, email, role);
    this.office = office;
    this.role = "Manager";
  }
}

module.exports = Manager;
