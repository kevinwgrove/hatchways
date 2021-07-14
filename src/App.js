import { ScaleLoader } from "react-spinners";
import './App.css';
import { fetchUrl, studentListItem, triggerDivider } from './helpers/helpers'
import { useEffect, useState } from 'react';
import { 
  InputBase,
  makeStyles,
  fade,
  Divider,
  List
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  // styles the search bar components
    inputRoot: {
      color: 'inherit',
      width: '100%'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    search: {
      position: 'relative',
      backgroundColor: fade(theme.palette.common.white, 1),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.85),
      },
      width: '100%',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  })
)

function App() {
  const classes = useStyles();
  const [students, setStudents] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchTag, setSearchTag] = useState('')
  const [valueAddTag, setValueAddTag] = useState('')
  const [targetNode, setTargetNode] = useState(null)
  const [tagsList, setTagsList] = useState([])
  const url = "https://api.hatchways.io/assessment/students"

  useEffect(async () => {
    // fetches student data and adds a tag key with an empty array value
    // then sets the mutated list as the students state
    let response = await fetchUrl(url)
    let newList = await response.students.map(
      (s) => ({...s, tags: []})
    )
    setStudents(newList)
  }, [])

  useEffect(() => {
    // this useEffect is listening to changes on valueAddTag and rerenders upon any changes to its state
  }, [valueAddTag])
  
  const buildStudentsList = (name, tag) => {
    // function listens to the search by name and search by tag inputs
    // it builds a list according to the search criteria
    // then calls the studentListItem function to build a component based on individual student's data
    if (name === '' && tag === '') {
      return ( 
        students.map((s) => {
          let grades = s.grades.map((i) => parseInt(i))
          let gradeAvg = grades.reduce((a,b) => a + b, 0) / grades.length
          let pos = students.indexOf(s) + 1
              return studentListItem(s, gradeAvg, targetNode, setTargetNode, pos, valueAddTag, setValueAddTag, tagsList, setTagsList)
            }
          )
      )
    } else if (name !== '' && tag !== '') {
      const res = students.filter(student => {
        if (student.firstName.toLowerCase().startsWith(name) || student.lastName.toLowerCase().startsWith(name)) {
          return student
        } 
      })
      const newRes = res.filter(student => {
        for (let i = 0; i < student.tags.length; i++) {
          if (student.tags[i].startsWith(tag)) {
            return student
          }
        }
      })
      return newRes.map((s) => {
        let grades = s.grades.map((i) => parseInt(i))
        let gradeAvg = grades.reduce((a,b) => a + b, 0) / grades.length
        let pos = students.indexOf(s) + 1
        return studentListItem(s, gradeAvg, targetNode, setTargetNode, pos, valueAddTag, setValueAddTag, tagsList, setTagsList)
      })
    } else if (name !== '') {
        const res = students.filter(student => {
          if (student.firstName.toLowerCase().startsWith(name) || student.lastName.toLowerCase().startsWith(name)) {
            return student
          } 
        })
        return res.map((s) => {
          let grades = s.grades.map((i) => parseInt(i))
          let gradeAvg = grades.reduce((a,b) => a + b, 0) / grades.length
          let pos = students.indexOf(s) + 1
          return studentListItem(s, gradeAvg, targetNode, setTargetNode, pos, valueAddTag, setValueAddTag, tagsList, setTagsList)
        })
    } else if (tag !== '') {
        const res = students.filter(student => {
          for (let i = 0; i < student.tags.length; i++) {
            if (student.tags[i].startsWith(tag)) {
              return student
            }
          }
        })
        return res.map((s) => {
          let grades = s.grades.map((i) => parseInt(i))
          let gradeAvg = grades.reduce((a,b) => a + b, 0) / grades.length
          let pos = students.indexOf(s) + 1
              return studentListItem(s, gradeAvg, targetNode, setTargetNode, pos, valueAddTag, setValueAddTag, tagsList, setTagsList)
        })
    }
  }

  return (
    <div
      id='app'
    >
      {
        students === [] ?
        <>
          <div id="loader">
            <ScaleLoader
              id='loader'
              color={'#FFFFFF'}
              height={90}
              width={20}
              radius={20}
              margin={10}
            />
          </div>
        </>
        :
        <div
          id='main-container'
        >
          
            <div 
              className={classes.search}
              id='search-bar-name'
            >
                <InputBase
                  placeholder="Search by name"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  className='search-input raleway'
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={e => 
                    setSearchName(e.target.value)
                  }
                  onFocus={(e) => triggerDivider(e)}
                  onBlur={(e) => triggerDivider(e)}
                />
            </div>
            <Divider
            className='input-divider'
            />
            <div 
              className={classes.search}
              id='search-bar-tag'
            >
                <InputBase
                  placeholder="Search by tag"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  className='search-input raleway'
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={e => setSearchTag(e.target.value)}
                  onFocus={(e) => triggerDivider(e)}
                  onBlur={(e) => triggerDivider(e)}
                />
            </div>
            <Divider 
            className='input-divider'
            />
            

            <List
              id='students-info-container'
            >
              { buildStudentsList(searchName, searchTag) }
            </List>

        </div>
      }
    </div>
  );
}

export default App;
