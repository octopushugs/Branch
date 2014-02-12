class RemoveLtsTables < ActiveRecord::Migration
  def change
  	drop_table :student_org_lts
  	drop_table :student_event_lts
  	drop_table :student_event_lt
  	drop_table :student_org_lt

  	remove_column :students, :city
  end
end
