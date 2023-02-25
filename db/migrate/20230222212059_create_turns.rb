class CreateTurns < ActiveRecord::Migration[7.0]
  def change
    create_table :turns do |t|
      t.integer :game_id
      t.string :old_guess
      t.string :new_guess
      t.boolean :is_old_guess
      t.timestamps
    end
  end
end
