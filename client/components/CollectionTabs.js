import React, {useState} from 'react'
import {Collection} from '../components'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Badge from 'react-bootstrap/Badge'

function CollectionTabs(props) {
  const [key, setKey] = useState('collection')

  return (
    <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
      <Tab
        eventKey="collection"
        title={
          <span>
            Collection{' '}
            <Badge variant="dark">{props.collection[0].records.length}</Badge>
          </span>
        }
      >
        <Collection type="collection" collection={props.collection} />
      </Tab>
      <Tab
        eventKey="wantlist"
        title={
          <span>
            Wantlist{' '}
            <Badge variant="dark">{props.collection[1].records.length}</Badge>
          </span>
        }
      >
        <Collection type="wantlist" collection={props.collection} />
      </Tab>
    </Tabs>
  )
}

export default CollectionTabs
