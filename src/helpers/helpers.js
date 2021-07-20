import {
    ListItem,
    Typography,
    Divider,
    Avatar,
    InputBase,
    IconButton
} from '@material-ui/core'
import {
    Add,
    Remove
} from '@material-ui/icons'

export const fetchUrl = async (url) => {
    // fetches data from url and converts it into json
    let response = await fetch(url)
    response =  await response.json()
    return response
}

export const triggerDivider = (e) => {
    // this changes the divider background color below the search input
    // depending on whether the input is focused on or has been exited
    if (e.type === 'blur') {
        document.querySelector('.input-divider-selected').classList = 'MuiDivider-root input-divider'
    } else if (e.type === 'focus') {
        e.target.parentElement.parentElement.nextElementSibling.classList = 'MuiDivider-root input-divider-selected'
    }
    return
}

export const studentListItem = (s, gradeAvg, targetNode, setTargetNode, pos, valueAddTag, setValueAddTag, tagsList, setTagsList, toggledGrades, setToggledGrades) => {
    // function builds and returns a list item component depending on individual student's data
    // const gradesContainer = document.querySelector('.grades-container')
    
    const toggleGrades = (s, node) => {
        // function builds the student's individual grades list
        // inserts it to the appropriate position on the student's list item component
        const tagContainer = document.getElementById(`student-${pos}-tag-container`)
        // if (gradesContainer) {
        //     gradesContainer.remove()
        // }
        let mainDiv = document.createElement('div')
        mainDiv.className = 'grades-container'
        mainDiv.style.marginBottom = '20px'
        let avatarFiller = document.createElement('div')
        avatarFiller.className = 'student-avatar-filler'
        mainDiv.appendChild(avatarFiller)
        let studentInfoContainer = document.createElement('div')
        studentInfoContainer.className = 'student-info-container'
        let studentInfo = document.createElement('div')
        studentInfo.className = 'student-info'
        studentInfo.style.paddingLeft = '45px'
        s.grades.map((grade) => {
            let pos = s.grades.indexOf(grade)
            let text = document.createElement('p')
            text.className = 'MuiTypography-root info-text raleway MuiTypography-body1'
            text.innerHTML = `Test ${pos + 1}: ${grade}%`
            studentInfo.appendChild(text)
        })
        studentInfoContainer.appendChild(studentInfo)
        mainDiv.appendChild(studentInfoContainer)
        if (mainDiv.parentNode === node || tagContainer.parentNode === node) {
            node.insertBefore(mainDiv, tagContainer)
        }
        return

    }

    const hideGrades = (node) => {
        node.children[1].remove()
        return
    } 

    const renderIcon = (pos, targetNode) => {
        // function returns a different icon depending on if the dropdown grades toggle was clicked
        let node = document.getElementById(`student-${pos}`)
        
        
        // if (node !== null) {
        //     if (node.children[1] === gradesContainer) {
        //         return (
        //             <>
        //                 <IconButton
        //                 size="small"
        //                 style={{
        //                     backgroundColor: "white"
        //                 }}
        //                 onClick={
        //                     () => {
        //                         setTargetNode(null)
        //                         gradesContainer.remove()
        //                     }
        //                 }
        //                 >
        //                     <Remove 
        //                     className="dropdown-icon"
        //                     onClick={
        //                         (e) => {
        //                             setTargetNode(null)
        //                             gradesContainer.remove()                            }
        //                     }
        //                     />
        //                 </IconButton>
        //             </>
        //         )
        //     } else if (targetNode === null || targetNode !== node) {
        //         return (
        //             <>
        //                 <IconButton
        //                 size="small"
        //                 style={{
        //                     backgroundColor: "white"
        //                 }}
        //                 onClick={
        //                     (e) => {
        //                         setTargetNode(e.target.parentNode.parentNode.parentNode.parentNode.parentNode)
        //                         toggleGrades(s, e.target.parentNode.parentNode.parentNode.parentNode.parentNode)
        //                     }
        //                 }
        //                 >
        //                     <Add 
        //                     className="dropdown-icon"
        //                     onClick={
        //                         (e) => {
        //                             setTargetNode(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode)
        //                             toggleGrades(s, e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode)
        //                         }
        //                     }
        //                     />
        //                 </IconButton>
        //             </>
        //         )
        //     }
        // } else {
        //     return (
        //         <>
        //             <IconButton
        //             size="small"
        //             style={{
        //                 backgroundColor: "white"
        //             }}
        //             onClick={
        //                 (e) => {
        //                     setTargetNode(e.target.parentNode.parentNode.parentNode.parentNode.parentNode)
        //                     toggleGrades(s, e.target.parentNode.parentNode.parentNode.parentNode.parentNode)
        //                 }
        //             }
        //             >
        //                 <Add 
        //                 className="dropdown-icon"
        //                 onClick={
        //                     (e) => {
        //                         setTargetNode(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode)
        //                         toggleGrades(s, e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode)
        //                     }
        //                 }
        //                 />
        //             </IconButton>
        //         </>
        //     )
        // }
    }

    return (
        <>
            <div
            className='student-card-container'
            id={`student-${pos}`}
            key={pos}
            >
                <ListItem
                className='student-card'
                >
                    <Avatar 
                    alt={`${s.firstName} ${s.lastName}`} 
                    src={s.pic}
                    className='student-avatar'
                    />
                    <div
                    className='student-info-container'
                    >

                        <Typography
                        variant='h2'
                        className='student-title raleway'
                        >
                            {s.firstName.toUpperCase() + ' ' + s.lastName.toUpperCase()}
                        </Typography>

                        <div
                        className='student-info'
                        >
                            <Typography
                            className='info-text raleway'
                            >
                            Email: {s.email}
                            </Typography>
                            <Typography
                            className='info-text raleway'
                            >
                            Company: {s.company}
                            </Typography>
                            <Typography
                            className='info-text raleway'
                            >
                            Skill: {s.skill}
                            </Typography>
                            <Typography
                            className='info-text raleway'
                            >
                            Average: {gradeAvg}%
                            </Typography>

                        </div>
                    </div>
                    <div
                    className="student-dropdown-icon-container"
                    >
                       {
                           s.gradesToggled ?
                            <>
                                <IconButton
                                size="small"
                                style={{
                                    backgroundColor: "white"
                                }}
                                >
                                    <Remove 
                                    className="dropdown-icon"
                                    onClick={
                                        (e) => {
                                            s.gradesToggled = !s.gradesToggled
                                            setTargetNode(document.getElementById(`student-${pos}`))
                                            document.getElementById(`student-${pos}`).children[1].remove()
                                            console.log(s.gradesToggled)
                                            setToggledGrades(toggledGrades.filter(tg => tg !== pos))
                                            e.stopPropagation()  
                                        }
                                    }
                                    />
                                </IconButton>
                            </>
                            :
                            <>
                                <IconButton
                                size="small"
                                style={{
                                    backgroundColor: "white"
                                }}
                                >
                                    <Add 
                                    className="dropdown-icon"
                                    onClick={
                                        (e) => {
                                            setTargetNode(document.getElementById(`student-${pos}`))
                                            toggleGrades(s, document.getElementById(`student-${pos}`))
                                            s.gradesToggled = !s.gradesToggled
                                            console.log(s.gradesToggled)
                                            console.log(document.getElementById(`student-${pos}`))
                                            setToggledGrades([...toggledGrades, pos])
                                            e.stopPropagation()
                                        }
                                    }
                                    />
                                </IconButton>
                            </>
                       }
                    </div>
                </ListItem>
                <div
                    className='tag-container'
                    id={`student-${pos}-tag-container`}
                >
                    <div
                        className='tag-list-container'
                        id={`student-${pos}-tags`}
                    >
                        {
                            s.tags
                            ?
                            s.tags.map(tag => {
                                return (
                                    <>
                                        <div
                                        className='tag-box'
                                        id={tag}
                                        >
                                            <Typography
                                            className='info-text raleway'
                                            style={{
                                                padding: '5px 10px',
                                                fontSize: '20px'
                                            }}
                                            >
                                                {tag}
                                            </Typography>
                                        </div>
                                    </>
                                )
                            })
                            :
                            null
                        }
                    </div>
                    <InputBase
                    placeholder="Add a tag"
                    className='add-tag-input raleway'
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={e => setValueAddTag(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (!s.tags.includes(valueAddTag)){
                                s.tags.push(valueAddTag)
                                e.target.value = ''
                                setTagsList([...tagsList, valueAddTag])
                            } else {
                                e.target.value = ''
                            }
                        }
                    }}
                    />
                </div>
            </div>
                <Divider 
                className='student-divider'
                />
        </>
    )
}
