const settings = {
  pairSize: 2,
  thinkTime: 5000,
  availableValues: Array(100).fill(0).map((value, index) => index),
}

// const BASE_URL_DEV = 'http://localhost:5000/fe-workshop-april-2018/us-central1';
const BASE_URL = 'https://us-central1-fe-workshop-april-2018.cloudfunctions.net'

const appState = {
  lastFlip: null,
  clickIndex: 2,
  state: {
    'login': {
      username: sessionStorage.getItem('username'),
      token: sessionStorage.getItem('token'),
    },
    'celebrate': false,
    'turns-taken': 0,
    'cards': [],
  },
  currentState: {
    'login': {
      username: sessionStorage.getItem('username'),
      token: sessionStorage.getItem('token'),
    },
    'celebrate': false,
    'turns-taken': 0,
    'cards': [],
  },
}


const sendScore = async (score, size) => {
  const response = await fetch(`${BASE_URL}/score`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      token: appState.state.login.token,
      project: 'vanilla-js',
      score,
      size,
    }),
  })

  if (!response.ok) {
    throw new Error(`${await response.text()}`)
  }

  return response.text()
}

// const login = async (name) => {
//   const response = await fetch(`${BASE_URL}/login`, {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       name,
//     }),
//   })
//
//   if (!response.ok) {
//     throw new Error(`${await response.text()}`)
//   }
//
//   const token = await response.text()
//
//   sessionStorage.setItem('username', name)
//   sessionStorage.setItem('token', token)
//
//   return token
// }

// function areEqual() {
//   let currentValue = null
//
//   return (card) => {
//     if (currentValue === null) {
//       currentValue = card.value
//     }
//
//     return currentValue === card.value
//   }
// }

// const isFlipped = (card) => card.state.flipped
// const isMatched = (card) => card.state.matched

// function buildBoard(pairs) {
//   const values = settings.availableValues.slice()
//
//   const valuePairs = Array(pairs).fill(0).map(() => {
//     const randomValueIndex = Math.floor(Math.random() * values.length)
//     const value = values[randomValueIndex]
//
//     values.splice(randomValueIndex, 1)
//
//     return Array(settings.pairSize).fill(value)
//   })
//
//   const realSpots = pairs * settings.pairSize
//   const nilCards = Array(Math.ceil(Math.sqrt(realSpots)) ** 2 - realSpots).fill(null)
//
//   return []
//     .concat(...valuePairs, nilCards)
//     .map((value) => ({
//       value,
//       sort: Math.random(),
//     }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({value}) => value)
// }
//
// function createCard(index, value) {
//   const $card = document.createElement('div')
//   $card.classList.add('card')
//   $card.dataset.cardIndex = index
//
//   return {
//     index,
//     value,
//     $card,
//     state: {
//       isNull: value === null,
//       flipped: false,
//       warning: false,
//       matched: false,
//     },
//     currentState: {
//       isNull: false,
//       flipped: false,
//       warning: false,
//       matched: false,
//     },
//   }
// }

// function unflipAllCards(cards) {
//   return cards.map((card) => {
//     if (!card.state.flipped) {
//       return card
//     }
//
//     return {
//       ...card,
//       state: {
//         ...card.state,
//         'flipped': false,
//         'card-value': card.matched ? card.value : '',
//       },
//     }
//   })
// }

// function cleanupFlippedCards(cards) {
//   /**
//      * @type {Array}
//      */
//   const flippedCards = cards.filter((card) => card.state.flipped === true)
//   const allFlippedEqual = flippedCards.every(areEqual())
//
//   if (flippedCards.length > 1 && !allFlippedEqual) {
//     return unflipAllCards(cards)
//   }
//
//   return cards
// }

// function checkMatches(cards) {
//   /**
//      * @type {Array}
//      */
//   const flippedCards = cards.filter((card) => card.state.flipped === true)
//   const allFlippedEqual = flippedCards.every(areEqual())
//
//   if ((flippedCards.length === settings.pairSize) && allFlippedEqual) {
//     return cards.map((card) => {
//       if (!flippedCards.includes(card)) {
//         return card
//       }
//
//       return {
//         ...card,
//         state: {
//           ...card.state,
//           matched: true,
//           flipped: false,
//         },
//       }
//     })
//   }
//
//   return cards
// }

// function warnCard(cards, index, value = true) {
//   if (value) {
//     setTimeout(() => {
//       appState.state.cards = warnCard(appState.state.cards, index, false)
//     }, 1000)
//   }
//
//   return cards.map((card) => {
//     if (card.index !== index) {
//       return card
//     }
//
//     return {
//       ...card,
//       state: {
//         ...card.state,
//         warning: value,
//       },
//     }
//   })
// }

function flipCard(cards, index) {
  if (cards[index].state.matched) {
    return cards
  }

  if (cards[index].state.isNull) {
    appState.state['turns-taken'] *= 2
  }

  if (cards[index].state.flipped || cards[index].state.isNull) {
    return warnCard(cards, index)
  }
  const cleanedCards = cleanupFlippedCards(cards)

  if (cleanedCards.filter((card) => card.state.flipped).length === 0) {
    appState.state['turns-taken'] += 1
  }

  const withFlipped = cleanedCards.map((card) => {
    if (card.index !== index) {
      return card
    }

    return {
      ...card,
      state: {
        ...card.state,
        'flipped': true,
        'card-value': card.value,
        'click-index': appState.clickIndex,
      },
    }
  })

  appState.lastFlip = Date.now()
  appState.clickIndex += 1

  return checkMatches(withFlipped)
}

const updateFunctions = {
  login($app, state, loginState) {
    if (loginState.error) {
      appState.loginForm.removeAttribute('hidden')
      appState.buildForm.setAttribute('hidden', true)
      appState.loginForm.querySelector('.msg').innerText = loginState.error
    } else {
      appState.loginForm.querySelector('.msg').innerText = ''
    }

    if (loginState.busy) {
      appState.loginForm.querySelectorAll('input,button').forEach((el) => el.setAttribute('disabled', 'disabled'))
    } else {
      appState.loginForm.querySelectorAll('input,button').forEach((el) => el.removeAttribute('disabled'))
    }

    if (loginState.username) {
      appState.loginForm.setAttribute('hidden', true)
      appState.buildForm.removeAttribute('hidden')
    } else {
      appState.loginForm.removeAttribute('hidden')
      appState.buildForm.setAttribute('hidden', true)
    }
  },
  pairs($app, state, requestedPairs) {
    if (!$app.querySelector('.turn-counter')) {
      const $tc = document.createElement('div')
      $tc.classList.add('turn-counter')
      $app.appendChild($tc)
    }

    const $prevBoard = $app.querySelector('.board')
    if ($prevBoard) {
      $app.removeChild($prevBoard)
    }

    appState.buildForm.classList.add('used')

    const $board = document.createElement('div')
    $board.classList.add('board')
    $app.appendChild($board)

    state.cards = buildBoard(requestedPairs).map((value, index) => createCard(index, value))
    state.cards.forEach((card) => $board.appendChild(card.$card))

    $board.style.setProperty('--board-columns', Math.sqrt(state.cards.length).toString(10))
    $board.addEventListener('click', (event) => {
      if (event.target.matches('.card')) {
        if (appState.state.celebrate) {
          return
        }
        const index = parseInt(event.target.dataset.cardIndex, 10)
        state.cards = flipCard(state.cards, index)
      }
    })
  },
  cards($app, state, cards) {
    cards.forEach((card) => {
      // eslint-disable-next-line no-use-before-define
      syncState(card.$card, card.state, card.currentState)
    })
  },
  checkEndgame($app, currentAppState) {
    const matchedCards = currentAppState.state.cards.filter(isMatched)
    const matchesCount = matchedCards.length / settings.pairSize

    if (matchesCount === currentAppState.state.pairs && !currentAppState.state.celebrate) {
      currentAppState.state = {
        ...currentAppState.state,
        celebrate: true,
      }

      sendScore(currentAppState.state['turns-taken'], currentAppState.state.pairs)
    }
  },
}

function syncState($el, state, currentState) {
  Object.keys(state).forEach((property) => {
    const requestedValue = state[property]
    if (requestedValue !== currentState[property]) {
      if (updateFunctions[property] !== undefined) {
        updateFunctions[property]($el, state, requestedValue)
      } else if (property === 'click-index') {
        $el.style.setProperty(`--${property}`, `${requestedValue}`)
      } else if (property.indexOf('-') !== -1) {
        $el.style.setProperty(`--${property}`, `"${requestedValue}"`)
      } else {
        $el.classList[requestedValue ? 'add' : 'remove'](property)
      }

      currentState[property] = requestedValue
    }
  })
}

function update(currentAppState, $app) {
  const timeSinceLastFlip = Date.now() - currentAppState.lastFlip
  if (currentAppState.lastFlip && timeSinceLastFlip >= settings.thinkTime && currentAppState.state.cards.filter(isFlipped)) {
    currentAppState.state.cards = unflipAllCards(currentAppState.state.cards)
  }

  updateFunctions.checkEndgame($app, currentAppState)

  syncState($app, currentAppState.state, currentAppState.currentState)

  requestAnimationFrame(() => update(currentAppState, $app))
}

(() => {
  const $app = document.getElementById('app')

  appState.loginForm = $app.querySelector('form.login')
  appState.buildForm = $app.querySelector('form.build')

  appState.loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const username = event.target.querySelector('[name=name]').value

    appState.state = {
      ...appState.state,
      login: {
        busy: true,
      },
    }

    try {
      const token = await login(username)
      appState.state = {
        ...appState.state,
        login: {
          busy: false,
          token,
          username,
        },
      }
    } catch (e) {
      appState.state = {
        ...appState.state,
        login: {
          busy: false,
          token: null,
          username: null,
          error: e.message,
        },
      }
    }
  })

  appState.buildForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const pairs = parseInt(event.currentTarget.querySelector('input').value, 10)
    if (pairs >= 1 && pairs !== appState.state.pairs) {
      appState.state = {
        ...appState.state,
        'turns-taken': 0,
        'celebrate': false,
        pairs,
      }
    }
  })

  update(appState, $app)
})()
