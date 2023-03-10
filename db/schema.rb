# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_07_204854) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "avatars", force: :cascade do |t|
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.string "solution"
    t.integer "leader_id"
    t.integer "turn_order", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "leader_name"
    t.string "player_1"
    t.string "player_2"
    t.string "player_3"
    t.string "player_4"
  end

  create_table "turns", force: :cascade do |t|
    t.integer "game_id"
    t.string "old_guess"
    t.string "new_guess"
    t.boolean "is_old_guess"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.boolean "is_solved"
  end

  create_table "user_games", force: :cascade do |t|
    t.integer "user_id"
    t.integer "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_leader"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.integer "num_games", default: 0
    t.integer "num_wins", default: 0
    t.string "profile_picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "avatar_id"
  end

end
