import React, {useState} from 'react'
import {Collection} from '../components'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

function CollectionTabs(props) {
  const [key, setKey] = useState('collection')

  return (
    <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
      <Tab eventKey="collection" title="Collection">
        <Collection type="collection" collection={props.collection} />
      </Tab>
      <Tab eventKey="wantlist" title="Wantlist">
        <Collection type="wantlist" collection={props.collection} />
      </Tab>
    </Tabs>
  )
}

export default CollectionTabs
