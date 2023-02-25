class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :solution
      t.integer :leader_id
      t.integer :turn_order, array: true, default: []
      t.timestamps
    end
  end
end
