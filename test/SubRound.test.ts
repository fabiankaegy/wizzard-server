import SubRound from "../gamelogic/SubRound";
import Player from "../gamelogic/Player";
import Card from "../gamelogic/Card";

describe("SubRound", () => {
    let currentSubRound: SubRound;
    let shareUpdates = jest.fn();
    let endSubRound = jest.fn();

	beforeEach(() => {
		currentSubRound = new SubRound({
            players: [
                new Player( { name: 'Fabian', id: 'test-fabian' } ),
                new Player( { name: 'Bea', id: 'test-bea' } ),
            ],
            currentRound: 1,
            shareUpdates: shareUpdates,
            endSubRound: endSubRound,
            trumpf: new Card( 'Red', { number: 1, sign: "1" } )
        });
    });
    
    test( 'Moves current player once first player gave prediction', () => {
        expect( currentSubRound.currentPlayer?.name ).toBe( 'Fabian' );

        currentSubRound.handlePlayerGavePrediction(
            currentSubRound.players[0], 0
        );
        
        expect( currentSubRound.currentPlayer?.name ).toBe( 'Bea' );
    } )

});
