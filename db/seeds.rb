puts "Resetting data..."
User.destroy_all
Game.destroy_all
UserGame.destroy_all
Turn.destroy_all

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