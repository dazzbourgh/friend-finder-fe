import { GroupService } from './group.service';
import { HttpClient } from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;

describe('GroupService', () => {

  it('should call http', () => {
    //given
    let http = createSpyObj('http', ['get']);
    const service: GroupService = new GroupService(http as unknown as HttpClient);
    //when
    service.getGroupInfo('1');
    //then
    expect(http.get).toHaveBeenCalled();
  });
});
