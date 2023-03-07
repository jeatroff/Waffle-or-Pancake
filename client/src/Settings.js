function Settings ({ user, numGames, numWins }) {
    function handleDelete(e) {
        return
    }

    return(
        <div>
            <h1>Profile</h1>
            {user ? (
                <div>
                    <p>Total games completed: {numGames}</p>
                    <p>Total games won: {numWins}</p>
                    <button onClick={handleDelete}>Delete Account</button>
                </div>
            ) : null}
        </div>
    )
}

export default Settings