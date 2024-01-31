// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDeleteTransactionItem} = props
  const {id, title, amount, type} = transactionDetails

  const onClickDelete = () => {
    onDeleteTransactionItem(id)
  }

  return (
    <li className="transaction-item">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default TransactionItem
