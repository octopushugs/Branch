class CreateStudentEventLts < ActiveRecord::Migration
  def change
    create_table :student_event_lts do |t|

      t.timestamps
    end
  end
end
