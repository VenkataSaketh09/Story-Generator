import React from 'react'
import {Textarea} from "@nextui-org/input";
function StorySubjectInput({UserSelection}:any) {
  return (
    <div>
        <label className='text-4xl text-primary font-bold'>1. Subject of the Story</label>
        <Textarea placeholder='Write the Subject of the Story which you want to generate' size='lg' classNames=
        {{
            input:"resize-y min-h-[230px] text-2xl p-5"
        }}
        className='mt-3 max-w-lg'
        onChange={(e)=>UserSelection({
            fieldValue: e.target.value,
            fieldName: 'storySubject'

        })}/>
    </div>
  )
}

export default StorySubjectInput