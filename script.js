// Store player names in an array
let players = [];

// Handle form submission
$("#players-form").submit(function(event) {
    event.preventDefault();
    players = $("#players-input").val().split(",");
    generateMatchups(players);
    $("#pair-button").removeClass("d-none");
});

// Handle pairing button click
$("#pair-button").click(function() {
    let winners = [];
    $(".matchup button.btn-success").each(function() {
        winners.push($(this).text());
    });
    if (winners.length > 1) {
        generateMatchups(winners);
    } else {
        $("#winner-text").text(winners[0]);
        $("#winner-container").removeClass("d-none");
        $("#pair-button").addClass("d-none");
    }
});

// Function to generate matchups
function generateMatchups(players) {
    let matchups = [];
    for (let i = 0; i < players.length; i += 2) {
        let player1 = players[i].trim();
        let player2 = (i+1 < players.length) ? players[i+1].trim() : "";
        matchups.push([player1, player2]);
    }
    $("#matchups-container").empty();
    for (let i = 0; i < matchups.length; i++) {
        let matchup = matchups[i];
        let html = `
            <div class="matchup mb-3">
                <button type="button" class="btn btn-primary btn-lg btn-block">${
                    matchup[0]}
                    </button>
                    <button type="button" class="btn btn-primary btn-lg btn-block">${matchup[1]}</button>
                </div>
            `;
            $("#matchups-container").append(html);
        }

        // Handle matchup button click
        $(".matchup button").click(function() {
            $(this).addClass("btn-success").siblings().removeClass("btn-success");
        });
    }
