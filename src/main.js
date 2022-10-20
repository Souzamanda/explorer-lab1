import "./css/index.css";
import IMask from "imask";
import { setLightMode } from "./switch"

const ccBgColor1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {

  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    elo: ["#C4793D", "#00A4E0"],
    american: ["#2B77C1", "#9AD1F7"],
    diners: ["#2D4F9E", "#0079BE"],
    hiper: ["#B53E44", "#B3131B"],
    maestro: ["#ED1B2E", "#009DDC"],
    discover: ["#FF8C33", "#FCC899"],
    default: ["black", "grey"],
  }

  ccBgColor1.setAttribute("fill", colors[type][0])
  ccBgColor2.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
  mask: '0000'
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.querySelector('#expiration-date')
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    },
  },
}
const expirationDateMasked = IMask(expirationDate,expirationDatePattern)

const cardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex:
        /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
      cardtype: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
      cardtype: "hiper",
    },
    {
      mask: "0000 000000 0000",
      regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
      cardtype: "diners",
    },
    {
      mask: "0000 000000 00000",
      regex: /^3[47]\d{0,13}/,
      cardtype: "american",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
      cardtype: "discover",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
      cardtype: "maestro",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    //console.log(foundMask.cardtype)
    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector('#add-card')
addButton.addEventListener('click', () => alert('Card added!'));

document.querySelector('form').addEventListener("submit", (e) => e.preventDefault());

const cardHolder = document.querySelector('#card-holder')
cardHolder.addEventListener('input', () => {
  const ccHolder = document.querySelector('.cc-holder .value')
  ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

securityCodeMasked.on('accept', (code) => {
  const ccSecurity = document.querySelector('.cc-security .value')
  code = securityCodeMasked.value
  ccSecurity.innerText = code.length === 0 ? "123" : code
})

cardNumberMasked.on("accept", (number) => {
  const ccNumber = document.querySelector(".cc-number")
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  number = cardNumberMasked.value

  setCardType(cardType)
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
})

expirationDateMasked.on("accept", () => {
  update(expirationDateMasked.value)
})

function update(date) {
  const ccExpiration = document.querySelector('.cc-extra .value')
  ccExpiration.innerText = date.length === 0 ? "02/32" : date
}

setCardType("default");
//setLightMode();

