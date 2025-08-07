import { Flex, Menu } from 'antd'
import React from 'react'
import { AiFillGitlab } from 'react-icons/ai'
const Sidebar = () => {
  return (
    <>
    <Flex justify='center' align='center' className='sidebar-header'>
      <div className="logo">
       <AiFillGitlab/> 
      </div>
    </Flex>
    <Menu mode ="inline" theme="light" defaultSelectedKeys={['1']} className='menu-bar'>
      
    </Menu>
    </>
  )
}

export default Sidebar