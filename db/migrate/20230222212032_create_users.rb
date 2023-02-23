class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, null: false, uniqueness: true
      t.string :password_digest, null: false
      t.integer :num_games, default: 0
      t.integer :num_wins, default: 0
      t.string :profile_picture
      t.timestamps
    end
  end
end
