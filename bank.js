class Node {
    constructor(accountNumber,accountBalance) {
        this.data={accountNumber,accountBalance};
        this.next=null;
    }
}

class TreeNode {
    constructor(accountNumber,accountBalance=0) {
        this.data={accountNumber,accountBalance};
        this.left=this.right=null;
    }
}

class LinkedList {
    constructor() { this.head=null; }

    addTransaction(transactionData) {
        if(!this.head) this.head=new Node(transactionData);
        else {
            const newNode=new Node(transactionData);
            let currentNode=this.head;
            while(currentNode.next) currentNode=currentNode.next;
            currentNode.next=newNode;
        }
    }

    addAccount(accountNumber,accountBalance) {
        if(!this.head) this.head=new Node(accountNumber,accountBalance);
        else {
            const newNode=new Node(accountNumber,accountBalance);
            let currentNode=this.head;
            while(currentNode.next) currentNode=currentNode.next;
            currentNode.next=newNode;
        }
    }
    
    showTransactions() {
        console.log();
        console.log('Transactions History:');
        if(!this.head) console.log('No transactions made yet');
        else {
            let currentNode=this.head,i=1;
            do {
                console.log(`Transaction${i++}: ${currentNode.data.accountNumber}`);
                currentNode=currentNode.next;
            }while(currentNode);
        }
    }

    showAccountHolders() {
        console.log();
        console.log('Account Holders List:');
        if(!this.head) console.log('No account created yet');
        else {
            let currentNode=this.head,i=1;
            do {
                console.log(`AccountHolder${i++}: {Account Number: ${currentNode.data.accountNumber}, Account Balance: Rs.${currentNode.data.accountBalance}}`);
                currentNode=currentNode.next;
            }while(currentNode);
        }
    }
}

class BinarySearchTree {
    constructor() { this.root=null; }

    insert(newAccount) {
        if(!this.root) this.root=newAccount;
        else {
            let root=this.root
            while(true) {
                if(root.data.accountNumber<newAccount.data.accountNumber) {
                    if(!root.right) {
                        root.right=newAccount;
                        return;
                    }
                    else root=root.right;
                }
                else {
                    if(!root.left) {
                        root.left=newAccount;
                        return;
                    }
                    else root=root.left;
                }
            }
        }
    }
    
    search(accountNumber) {
        let root=this.root;
        while(true) {
            if(!root || root.data.accountNumber==accountNumber) return root;
            else {
                if(root.data.accountNumber<accountNumber) root=root.right;
                else root=root.left;
            }
        }
    }
}

class Bank {
    constructor() { 
        this.accountHolders=new LinkedList();
        this.accountsStructure=new BinarySearchTree();
        this.transactionHistory=new LinkedList();
    }

    createAccount(accountNumber,accountBalance) {
        if(this.accountsStructure.search(accountNumber)) console.log('Account already exists!');
        else {
            this.accountHolders.addAccount(accountNumber,accountBalance)
            this.accountsStructure.insert(new TreeNode(accountNumber,accountBalance));
            console.log('Account created successfully');
        }
    }

    findAccount(accountNumber) { return this.accountsStructure.search(accountNumber) };

    transferAmount(fromAccount,toAccount,transferAmount) {
        const sender=this.findAccount(fromAccount);
        const receiver=this.findAccount(toAccount);
        console.log();
        if(!sender || !receiver) console.log('Pls check the account numbers');
        else {
            if(this.checkBalance(sender.data.accountNumber)<transferAmount) {
                console.log('Insufficient Balance');
                this.transactionHistory.addTransaction(`failed sending from account number ${fromAccount} to account number ${toAccount}`);
            }
            else {
                sender.data.balance-=transferAmount;
                receiver.data.balance+=transferAmount;
                console.log(`Transaction Successuful: Rs.${transferAmount} sent from account number ${fromAccount} to account ${toAccount}`)
                this.transactionHistory.addTransaction(`successfuly sent Rs.${transferAmount} from account number ${fromAccount} to account number ${toAccount}`);
            }
        }
    }

    checkBalance(accountNumber) {
        const account=this.accountsStructure.search(accountNumber);
        if(!account) console.log('Invalid account number');
        else return account.data.accountBalance;
    } 
}

const bank=new Bank();
bank.createAccount(200,3000);
bank.createAccount(300,4000);
bank.accountHolders.showAccountHolders();
bank.transferAmount(200,300,25000);
bank.transferAmount(200,300,2000);
bank.transactionHistory.showTransactions();