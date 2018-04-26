const flipCard = (cards, index) => {
    if (cards[index].state.matched) {
        return cards
    }

    if (cards[index].state.isNull) {
        this.appState.state.turnsTaken *= 2
    }

    if (cards[index].state.flipped || cards[index].state.isNull) {
        return this.warnCard(cards, index)
    }
    const cleanedCards = this.cleanupFlippedCards(cards)

    if (cleanedCards.filter((card) => card.state.flipped).length === 0) {
        this.appState.state.turnsTaken += 1
    }

    const withFlipped = cleanedCards.map((card) => {
        if (card.index !== index) {
            return card
        }

        return {
            ...card,
            state: {
                ...card.state,
                flipped: true,
                cardValue: card.value,
                clickIndex: this.appState.clickIndex,
            },
        }
    })

    this.appState.lastFlip = Date.now()
    this.appState.clickIndex += 1

    return this.checkMatches(withFlipped)
}

warnCard = (cards, index, value = true) => {
    if (value) {
        setTimeout(() => {
            this.appState.state.cards = this.warnCard(this.appState.state.cards, index, false)
        }, 1000)
    }

    return cards.map((card) => {
        if (card.index !== index) {
            return card
        }

        return {
            ...card,
            state: {
                ...card.state,
                warning: value,
            },
        }
    })
};

areEqual = () => {
    let currentValue = null;

    return (card) => {
        if (currentValue === null) {
            currentValue = card.value
        }

        return currentValue === card.value
    }
};

checkMatches = (cards) => {
    const flippedCards = cards.filter((card) => card.state.flipped === true);
    const allFlippedEqual = flippedCards.every(this.areEqual());

    if ((flippedCards.length === this.settings.pairSize) && allFlippedEqual) {
        return cards.map((card) => {
            if (!flippedCards.includes(card)) {
                return card
            }

            return {
                ...card,
                state: {
                    ...card.state,
                    matched: true,
                    flipped: false,
                },
            }
        })
    }
    return cards
}

// CLEAN UP

cleanupFlippedCards = (cards) => {
    const flippedCards = cards.filter((card) => card.state.flipped === true)
    const allFlippedEqual = flippedCards.every(areEqual())

    if (flippedCards.length > 1 && !allFlippedEqual) {
        return this.unflipAllCards(cards)
    }
    return cards
}

unflipAllCards = (cards) => {
    return cards.map((card) => {
        if (!card.state.flipped) {
            return card
        }

        return {
            ...card,
            state: {
                ...card.state,
                'flipped': false,
                'card-value': card.matched ? card.value : '',
            },
        }
    })
};

export default flipCard;