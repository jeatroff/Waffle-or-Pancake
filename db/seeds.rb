puts "Resetting data..."
User.destroy_all
Avatar.destroy_all
Game.destroy_all
UserGame.destroy_all
Turn.destroy_all

puts "Seeding profile pictures..."
Avatar.create!([
    {image: "https://api.dicebear.com/5.x/bottts/svg?seed=1&backgroundColor=c0aede", id: 1},
    {image: "https://api.dicebear.com/5.x/bottts/svg?seed=2&backgroundColor=ffd5dc", id: 2},
    {image: "https://api.dicebear.com/5.x/bottts/svg?seed=3&backgroundColor=faf290", id: 3},
    {image: "https://api.dicebear.com/5.x/bottts/svg?seed=10&backgroundColor=d1d4f9", id: 4},
    {image: "https://api.dicebear.com/5.x/bottts/svg?seed=5&backgroundColor=93d1b2", id: 5},
    {image: "https://api.dicebear.com/5.x/bottts/svg?seed=6&backgroundColor=f8bfe8", id: 6},
    {image: "https://api.dicebear.com/5.x/bottts/svg?seed=Felix&backgroundColor=b6e3f4", id: 7},
    {image: "https://api.dicebear.com/5.x/bottts/svg?seed=8&backgroundColor=ffdfbf", id: 8},
])


puts "Seeding users..."
User.create!([
    {
        username: "asdk29",
        password: "Password"
    },
    {
        username: "ben22",
        password: "Password"

    },
    {
        username: "pat200",
        password: "Password"

    },
    {
        username: "kris893",
        password: "Password"

    },
    {
        username: "jeatroff",
        password: "Password"
    }
])

puts "Adding profile pictures to users..."

puts "Seeding games..."

# for i in 1..100 do
#     Game.create!([
#         {
#             solution: "",
#             leader_name: "a",
#             player_1: "a"
#         }
#     ])
# end


puts "Adding users to games..."
# Game.all.each do |game|
#     user = User.find(User.pluck(:id).sample)
#     game.leader_name = user.username
#     UserGame.create!(user_id: user.id, game_id: game.id, is_leader: true)
#     rand(1..4).times do
#       user = User.find(User.pluck(:id).sample)
#       UserGame.create!(user_id: user.id, game_id: game.id, is_leader: false)
#     end
# end

puts "Adding turns to games..."

puts "Done seeding!"