class AddIsLeaderToUserGame < ActiveRecord::Migration[7.0]
  def change
    add_column :user_games, :is_leader, :boolean
  end
end
