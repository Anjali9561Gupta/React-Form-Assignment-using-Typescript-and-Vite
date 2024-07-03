//Importing MUI library modules
import React, { useState } from 'react';
import { Checkbox, Collapse, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// Define Department interface
interface Department {
  department: string;
  subDepartments: string[];
}

// Hardcoded JSON data with type annotation
const departmentsData: Department[] = [
  {
    department: 'HR',
    subDepartments: ['Recruitment', 'Employee Relations', 'Compensation and Benefits']
  },
  {
    department: 'Engineering',
    subDepartments: ['Development', 'QA', 'DevOps']
  }
];

const DepartmentsList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  // Toggle the collapse of a department's sub-departments
  const handleToggle = (department: string) => {
    setOpen(prev => ({ ...prev, [department]: !prev[department] }));
  };

  // Select or deselect department and its sub-departments
  const handleSelect = (item: string, isSub: boolean) => {
    setSelected(prev => {
      const updated = { ...prev, [item]: !prev[item] };

      if (!isSub) {
        // If a department is selected/deselected, select/deselect all sub-departments
        const departmentObj = departmentsData.find(d => d.department === item);
        if (departmentObj) {
          departmentObj.subDepartments.forEach(sub => {
            updated[sub] = !prev[item];
          });
        }
      } else {
        // If a sub-department is selected/deselected, update the parent department status
        const departmentObj = departmentsData.find(d => d.subDepartments.includes(item));
        const department = departmentObj?.department;
        if (department) {
          const allSubDepartmentsSelected = departmentsData.find(d => d.department === department)?.subDepartments.every(sub => updated[sub]) || false;
          updated[department] = allSubDepartmentsSelected;
        }
      }

      return updated;
    });
  };

  return (
    <List>
      {departmentsData.map(({ department, subDepartments }) => (
        <div key={department}>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected[department] || false}
                onClick={() => handleSelect(department, false)}
              />
            </ListItemIcon>
            <ListItemText primary={department} />
            <IconButton onClick={() => handleToggle(department)}>
              {open[department] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={open[department]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {subDepartments.map(sub => (
                <ListItem key={sub} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selected[sub] || false}
                      onClick={() => handleSelect(sub, true)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={sub} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentsList;