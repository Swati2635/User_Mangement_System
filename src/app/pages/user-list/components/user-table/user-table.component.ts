import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// SERVICES
import { GlobalDataService } from '@core/services/common';
// MODELS
import { PROFILE } from '@models/auth';
// ENV
import { environment } from '@environments/environment';
@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  private readonly userRoles = environment?.userRoles;
  @Input() userList!: PROFILE[];
  @Output() update = new EventEmitter<PROFILE>();
  @Output() delete = new EventEmitter<PROFILE>();

  // Pagination variables
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize: number = 5;
  pageIndex: number = 0;

  searchQuery: any;
  constructor(private globalData: GlobalDataService) {}

  ngOnInit(): void {}
  visualizeUserRole(roleIndex: number | undefined): string {
    return this.userRoles[roleIndex ? roleIndex : 0];
  }
  // AVOID TO DELETE CURRENT USER
  isOwner(user: PROFILE): boolean {
    return this.globalData.currentUser$.getValue()?.id === user?.id;
  }
  // FOR LOOP PERFORMANCE
  trackByFn(index: number, user: PROFILE): number {
    return user?.id;
  }

  // Method to handle page change event
  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  // Get a sliced portion of the user list based on pagination
  getPaginatedUsers() {
    const startIndex = this.pageIndex * this.pageSize;
    return this.userList.slice(startIndex, startIndex + this.pageSize);
  }
}
