class AddColumnsToLkTables < ActiveRecord::Migration
def change
	create_table :student_org_lt do |t|
		t.integer :student_id
		t.integer :org_id
	end

	create_table :student_event_lt do |t|
		t.integer :student_id
		t.integer :event_id
	end

end
end
