class CreateSolookups < ActiveRecord::Migration
  def change
    create_table :solookups do |t|

      t.timestamps
      t.integer :student_id
      t.integer :org_id
    end
  end
end
