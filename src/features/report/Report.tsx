import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { selectAccounts } from '../common/accountsSlice';
import { selectTopUps } from '../common/topUpsSlice';

import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import AccountBox from '@mui/icons-material/AccountBox';
import AccountBalance from '@mui/icons-material/AccountBalance';

export function Report() {
  const accounts = useAppSelector(selectAccounts);
  const topUps = useAppSelector(selectTopUps);
  return (
    <>
      <Typography component='h1' variant='h5' gutterBottom={true}>
        Accounts
      </Typography>
      <List>
        {accounts && accounts.map((account, index) => (
          <>
            <ListItem key={index}>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText
                primary={`Account ${account.accountName}. Balance: $${account.balance}`}
                secondary={`Licence plate number: ${account.plateNumber}. Created at ${account.createdAt}`}
              />
            </ListItem>
            {topUps.map((topUp, index) => {
              if (topUp.accountName === account.accountName) {
                return (
                  <List disablePadding>
                    <ListItem key={index} sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <AccountBalance />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Top up for $${topUp.topUpAmount}`}
                        secondary={`Made at ${topUp.createdAt}`}
                      />
                    </ListItem>
                  </List>
                );
              }
            })}
          </>
        ))}
      </List>
    </>
  );
}
