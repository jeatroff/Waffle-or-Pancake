class AddPlayersToGame < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :leader_name, :string
    add_column :games, :player_1, :string
    add_column :games, :player_2, :string, default: nil
    add_column :games, :player_3, :string, default: nil
    add_column :games, :player_4, :string, default: nil
  end
end
