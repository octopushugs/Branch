class CreateSelookups < ActiveRecord::Migration
  def change
    create_table :selookups do |t|

      t.timestamps
      t.integer :student_id
      t.integer :event_id
    end
  end
end
