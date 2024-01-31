// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {typeDetails, amount} = props
  const {typeName, imgUrl, imgAltText} = typeDetails
  return (
    <li className={`money-detail-container ${imgAltText}`}>
      <img src={imgUrl} alt={imgAltText} className="money-type-image" />
      <div>
        <p className="type-name">Your {typeName}</p>
        <p className="type-amount" data-testid={`${imgAltText}Amount`}>
          Rs. {amount}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
