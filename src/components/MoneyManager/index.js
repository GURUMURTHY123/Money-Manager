import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const moneyTypes = [
  {
    typeId: 'BALANCE',
    typeName: 'Balance',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    imgAltText: 'balance',
  },
  {
    typeId: 'INCOME',
    typeName: 'Income',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    imgAltText: 'income',
  },
  {
    typeId: 'EXPENSES',
    typeName: 'Expenses',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    imgAltText: 'expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    activeOptionId: transactionTypeOptions[0].optionId,
    historyList: [],
  }

  onChangeTitleInput = e => {
    this.setState({titleInput: e.target.value})
  }

  onChangeAmountInput = e => {
    this.setState({amountInput: e.target.value})
  }

  onChangeOption = e => {
    this.setState({activeOptionId: e.target.value})
  }

  onAddTransaction = e => {
    e.preventDefault()
    const {titleInput, amountInput, activeOptionId, historyList} = this.state
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: amountInput ? parseInt(amountInput) : 0,
      type: transactionTypeOptions.find(
        eachOption => eachOption.optionId === activeOptionId,
      ).displayText,
    }
    this.setState({
      historyList: [...historyList, newTransaction],
      titleInput: '',
      amountInput: '',
      activeOptionId: transactionTypeOptions[0].optionId,
    })
  }

  onDeleteTransactionItem = itemId => {
    const {historyList} = this.state
    const updatedHistoryList = historyList.filter(
      eachHistory => eachHistory.id !== itemId,
    )
    this.setState({historyList: updatedHistoryList})
  }

  getAmountDetails = historyList => {
    let balance = 0
    let income = 0
    let expenses = 0
    historyList.forEach(eachTransaction => {
      const {amount} = eachTransaction
      if (eachTransaction.type === 'Income') {
        balance += amount
        income += amount
      } else {
        balance -= amount
        expenses += amount
      }
    })
    return {balance, income, expenses}
  }

  render() {
    const {historyList, titleInput, amountInput, activeOptionId} = this.state
    const amountObject = this.getAmountDetails(historyList)
    return (
      <div className="app-container">
        <div className="user-details-bg-container">
          <div className="user-details-container">
            <h1 className="heading">Hi, Richard</h1>
            <p className="description">
              Welcome back to your <span>Money Manager</span>
            </p>
          </div>
          <ul className="money-details-container">
            {moneyTypes.map(eachType => (
              <MoneyDetails
                key={eachType.typeId}
                typeDetails={eachType}
                amount={amountObject[eachType.imgAltText]}
              />
            ))}
          </ul>
          <div className="add-details-history-container">
            <form className="form-container" onSubmit={this.onAddTransaction}>
              <h1 className="transaction-text">Add Transaction</h1>
              <label htmlFor="titleInput">TITLE</label>
              <input
                id="titleInput"
                type="text"
                placeholder="TITLE"
                value={titleInput}
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="amountInput">AMOUNT</label>
              <input
                id="amountInput"
                type="text"
                placeholder="AMOUNT"
                value={amountInput}
                onChange={this.onChangeAmountInput}
              />
              <label htmlFor="amount-type">TYPE</label>
              <select
                id="amount-type"
                value={activeOptionId}
                onChange={this.onChangeOption}
              >
                {transactionTypeOptions.map(eachTransactionType => (
                  <option
                    key={eachTransactionType.optionId}
                    value={eachTransactionType.optionId}
                  >
                    {eachTransactionType.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div className="history-list-bg-container">
              <h1 className="history-text">History</h1>
              <div className="history-list-container">
                <div className="header-container">
                  <p>Title</p>
                  <p>Amount</p>
                  <p>Type</p>
                </div>
                {historyList && (
                  <ul className="unordered-list-container">
                    {historyList.map(eachHistory => (
                      <TransactionItem
                        key={eachHistory.id}
                        transactionDetails={eachHistory}
                        onDeleteTransactionItem={this.onDeleteTransactionItem}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
