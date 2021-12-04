class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let balance = 0;
    for (const obj in this.transactions) {
      balance += this.transactions[obj].value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}
// abstract class
class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  // check if transaction allowed / validate withdrawals

  commit() {
    if (!this.isAllowed()) return false;    
    // keep track of the time of the transaction
    this.time = new Date();
    // add the transaction to the account
    this.account.addTransaction(this);
    // this.account.balance += this.value;
    // }    
    return true;
  }  
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }  
  // it has access to this.account b/c of parent
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {
  
  get value() {
    return this.amount;
  }
  // deposits always allowed
  isAllowed() {
    return true;
  }
}

// DRIVER CODE

const myAccount = new Account("billybob");

console.log("Starting balance", myAccount.balance)

t1 = new Deposit(120.00, myAccount);
t1.commit();

t2 = new Withdrawal(50.00, myAccount);
t2.commit();

t3 = new Withdrawal(500, myAccount); // should not be validated.
t3.commit();

console.log('Ending Balance:', myAccount.balance);
// console.log('Transactions:', myAccount.transactions);