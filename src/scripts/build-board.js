const buildBoard = (pairs, settings) => {
        const values = this.settings.availableValues.slice()

        const valuePairs = Array(pairs).fill(0).map(() => {
            const randomValueIndex = Math.floor(Math.random() * values.length)
            const value = values[randomValueIndex]

            values.splice(randomValueIndex, 1)

            return Array(settings.pairSize).fill(value)
        })

        const realSpots = pairs * settings.pairSize
        const nilCards = Array(Math.ceil(Math.sqrt(realSpots)) ** 2 - realSpots).fill(null)

        const result = []
            .concat(...valuePairs, nilCards)
            .map((value) => ({
                value,
                sort: Math.random(),
            }))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value)

        return result.map((value, index) => createCard(index, value))
    }

    const createCard = (index, value) => {
        const $card = document.createElement('div')
        $card.classList.add('card')
        $card.dataset.cardIndex = index

        return {
            index,
            value,
            $card,
            state: {
                isNull: value === null,
                flipped: false,
                warning: false,
                matched: false,
            },
            currentState: {
                isNull: false,
                flipped: false,
                warning: false,
                matched: false,
            },
        }
    }

export default buildBoard;